-- ============================================
-- Phase 6: Group Trip Planning + Friends List
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================

-- 1. FRIENDS TABLE
-- Bidirectional friendship between users
CREATE TABLE public.friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);
CREATE INDEX idx_friends_user ON public.friends(user_id);
CREATE INDEX idx_friends_friend ON public.friends(friend_id);

-- 2. TRIP MEMBERS TABLE
-- Many-to-many between users and trips
CREATE TABLE public.trip_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('organizer', 'member')),
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);
CREATE INDEX idx_trip_members_trip ON public.trip_members(trip_id);
CREATE INDEX idx_trip_members_user ON public.trip_members(user_id);

-- 3. TRIP ITINERARY TABLE
-- Day-by-day items within a trip
CREATE TABLE public.trip_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  day_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_trip_itinerary_trip ON public.trip_itinerary(trip_id);

-- 4. NOTIFICATIONS TABLE
-- In-app notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, read) WHERE read = false;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- FRIENDS: Users can see their own friendships
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own friendships"
  ON public.friends FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can send friend requests"
  ON public.friends FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update friendships they received"
  ON public.friends FOR UPDATE
  USING (auth.uid() = friend_id)
  WITH CHECK (auth.uid() = friend_id);

CREATE POLICY "Users can delete own friendships"
  ON public.friends FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- TRIP MEMBERS: Users can see trip members for trips they belong to
ALTER TABLE public.trip_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trip members can view members"
  ON public.trip_members FOR SELECT
  USING (
    auth.uid() = user_id OR
    trip_id IN (SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid()) OR
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
  );

CREATE POLICY "Trip organizers can invite members"
  ON public.trip_members FOR INSERT
  WITH CHECK (
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()) OR
    trip_id IN (SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND role = 'organizer')
  );

CREATE POLICY "Members can update own membership"
  ON public.trip_members FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Organizers can remove members"
  ON public.trip_members FOR DELETE
  USING (
    auth.uid() = user_id OR
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
  );

-- TRIP ITINERARY: Visible to trip members
ALTER TABLE public.trip_itinerary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trip members can view itinerary"
  ON public.trip_itinerary FOR SELECT
  USING (
    trip_id IN (SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid()) OR
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
  );

CREATE POLICY "Trip members can add itinerary items"
  ON public.trip_itinerary FOR INSERT
  WITH CHECK (
    auth.uid() = created_by AND (
      trip_id IN (SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND status = 'accepted') OR
      trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can update own itinerary items"
  ON public.trip_itinerary FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own itinerary items"
  ON public.trip_itinerary FOR DELETE
  USING (
    auth.uid() = created_by OR
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
  );

-- NOTIFICATIONS: Users can only see their own
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- System can insert notifications (service role only via server actions)
CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER trip_itinerary_updated_at
  BEFORE UPDATE ON public.trip_itinerary
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

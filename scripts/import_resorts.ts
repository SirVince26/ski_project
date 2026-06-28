/**
 * Corduroy - Resort Data Ingestion Script
 * 
 * This script provides a scalable architecture to import or update resort data 
 * from CSV or JSON files into the Supabase database. It prevents duplicates 
 * by checking existing 'slug' fields.
 * 
 * Usage:
 * ts-node scripts/import_resorts.ts path/to/resorts.json
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables. Please check .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importResorts(filePath: string) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Naive parse - in a real-world scenario you'd use a CSV parser library like 'csv-parse' if handling CSVs.
    // For this architecture MVP, we assume a JSON array of resort objects.
    let resortsData = [];
    if (filePath.endsWith('.json')) {
      resortsData = JSON.parse(fileContent);
    } else {
      throw new Error("Only JSON imports are currently supported in the MVP architecture.");
    }

    console.log(`Loaded ${resortsData.length} resorts from ${filePath}`);
    
    let successCount = 0;
    let errorCount = 0;

    for (const resort of resortsData) {
      // Upsert logic: insert or update based on the slug. 
      // Supabase natively supports ON CONFLICT if a unique constraint exists, 
      // but doing it iteratively here gives us fine-grained error reporting.
      
      const { data, error } = await supabase
        .from('resorts')
        .upsert(resort, { onConflict: 'slug' })
        .select();

      if (error) {
        console.error(`Failed to import ${resort.name}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`Imported / Updated: ${resort.name}`);
        successCount++;
      }
    }

    console.log(`\nImport complete! Success: ${successCount} | Errors: ${errorCount}`);

  } catch (err: any) {
    console.error("Fatal Error during import:", err.message);
  }
}

// Execute
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Please provide a path to the JSON data file. Example: ts-node scripts/import_resorts.ts data.json");
  process.exit(1);
}

importResorts(args[0]);

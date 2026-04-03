import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kccjggtvbigyakzumphc.supabase.co";
const supabaseKey = "sb_publishable_XiOJXWoFg-IM2y_bq95I7g_wMSh7OKU";

export const supabase = createClient(supabaseUrl, supabaseKey);

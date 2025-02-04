const { createClient } = require('@supabase/supabase-js');

function createSupabaseClient(supabaseUrl, supabaseKey) {
  return createClient(supabaseUrl, supabaseKey);
}

module.exports = { createSupabaseClient };
    
const express = require('express');
const router = express.Router();
const { createSupabaseClient } = require('../utils/supabaseClient');
const { checkRLS, checkPITR } = require('../utils/db');
const { sendEvidenceToDelve } = require('../utils/delve');

router.post('/', async (req, res) => {
  const { supabaseUrl, supabaseKey } = req.body;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(400).json({ error: 'Supabase URL and Key are required' });
  }

  try {
    const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

    // 1. Check MFA for users
    // Note: In a real scenario, the admin API would provide user details.
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    console.log(users,'users')
    let mfaResults = [];
    if (userError) {
      mfaResults = { error: 'Error retrieving users', details: userError.message };
    } else {
      mfaResults = users.map(user => ({
        id: user.id,
        email: user.email,
        // Assume a property (for demonstration) named `mfa_enrolled`
        mfaEnabled: user.mfa_enrolled ?? false,
        status: user.mfa_enrolled ? 'PASS' : 'FAIL'
      }));
    }

    // 2. Check RLS for tables (simulated)
    const rlsResults = await checkRLS(supabaseUrl, supabaseKey);

    // 3. Check PITR for projects (simulated)
    const pitrResults = await checkPITR(supabaseUrl, supabaseKey);

    // Collect evidence with a timestamp
    const evidence = {
      timestamp: new Date().toISOString(),
      mfaResults,
      rlsResults,
      pitrResults
    };
    // const delveResult = await sendEvidenceToDelve(evidence);
    // console.log("Delve integration result:", delveResult);

    res.json(evidence);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

module.exports = router;
// backend/src/routes/scan.ts
// const express= require('express');
// const { createSupabaseClient }= require('../utils/supabaseClient');
// const { checkRLS, checkPITR } = require( '../utils/db');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { supabaseUrl, supabaseKey } = req.body;
//   if (!supabaseUrl || !supabaseKey) {
//     return res.status(400).json({ error: 'Supabase URL and Key are required' });
//   }
  
//   try {
//     // IMPORTANT: Ensure that the supplied supabaseKey is the Service Role Key
//     const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

//     // 1. Check MFA for users
//     const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
//     if (userError) {
//       // Log the full error object for more details
//       console.error("Error retrieving users:", userError);
//       return res.status(500).json({ error: 'Error retrieving users', details: userError.message });
//     }

//     // Process users and check MFA status.
//     const mfaResults = users.map((user) => ({
//       id: user.id,
//       email: user.email,
//       // Assuming MFA status is stored in user_metadata as `mfa_enrolled`
//       mfaEnabled: user.user_metadata?.mfa_enrolled ?? false,
//       status: user.user_metadata?.mfa_enrolled ? 'PASS' : 'FAIL'
//     }));

//     // 2. Check RLS for tables (simulated)
//     const rlsResults = await checkRLS(supabaseUrl, supabaseKey);

//     // 3. Check PITR for projects (simulated)
//     const pitrResults = await checkPITR(supabaseUrl, supabaseKey);

//     // 4. Collect evidence with timestamp
//     const evidence = {
//       timestamp: new Date().toISOString(),
//       mfaResults,
//       rlsResults,
//       pitrResults,
//     };

//     console.log("Evidence collected:", evidence);
//     res.json(evidence);
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     res.status(500).json({ error: 'Internal server error', details: err.message });
//   }
// });

// module.exports = router;
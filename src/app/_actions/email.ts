// // app/api/test-email/route.ts
// import { NextResponse } from 'next/server';
// import { sendEmailAction } from '@/app/_actions/email';

// export async function GET() {
//   try {
//     const testData = {
//       from_name: "Test User",
//       from_email: "test@example.com",
//       phone: "1234567890",
//       radio_option: "Test Option",
//       beneficiary: "Test Beneficiary",
//       delivery_option: "Test Delivery",
//       code_postal: "12345",
//       commune: "Test Commune",
//       facultatif: "Test Facultatif",
//       voie: "Test Voie",
//       cadastral: "Test Cadastral",
//       terrain: "Test Terrain",
//       number: "Test Number",
//       option1: "Test Option1",
//       portes_fenetres: "Test Portes",
//       echeance: "Test Echeance",
//       autorisation: "Test Autorisation"
//     };

//     const result = await sendEmailAction(testData);
//     return NextResponse.json({ success: true, result });
//   } catch (error) {
//     console.error('Test email failed:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }
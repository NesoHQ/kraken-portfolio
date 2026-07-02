// import { getSingleton, insertDoc, query } from './pg';

// export async function seedAbout() {
//   const existing = await getSingleton('about');
//   // Only seed if truly empty — no doc at all, or missing all key fields
//   const isEmpty = !existing || (
//     !existing.services?.length &&
//     !existing.techStack?.length &&
//     !existing.bio?.length
//   );
//   if (isEmpty) {
//     await query('DELETE FROM about');
//     await insertDoc('about', ABOUT_SEED);
//   }
// }

// export async function seedResume() {
//   const existing = await getSingleton('resume');
//   const isEmpty = !existing || (
//     !existing.experience?.length &&
//     !existing.skills?.length
//   );
//   if (isEmpty) {
//     await query('DELETE FROM resume');
//     await insertDoc('resume', RESUME_SEED);
//   }
// }

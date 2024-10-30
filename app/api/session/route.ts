import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * Handles the GET request to retrieve the server session.
 * This function fetches the current server session using the provided authentication options.
 *
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the session data in JSON format.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  return NextResponse.json({ session });
}
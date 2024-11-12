export const dynamic = 'force-dynamic';

import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `form-submission-${timestamp}.json`;
    const dirPath = path.join(process.cwd(), 'app/data');

    // Ensure data directory exists
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, fileName);
    await writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving form data:', error);
    return NextResponse.json(
      { error: 'Failed to save form data' },
      { status: 500 }
    );
  }
}

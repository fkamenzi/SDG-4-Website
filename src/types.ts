/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewType = 'dashboard' | 'sandbox' | 'resources' | 'about';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  originalText: string;
  simplifiedText: string;
  timestamp: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  description: string;
  simplifiedDescription: string;
  category: 'Technical' | 'Vocational' | 'Higher Education' | 'Socio-Economic';
  fileSize: string;
  downloadCount: number;
  tags: string[];
  imageUrl: string;
}

export interface PosterTemplate {
  id: string;
  title: string;
  subtitle: string;
  slogan: string;
  sdgGoal: string;
  accentColor: string;
  message: string;
  bullets: string[];
}

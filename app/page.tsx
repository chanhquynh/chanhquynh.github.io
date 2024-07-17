'use client';

import { Octokit } from 'octokit';

import { Blessing } from './components';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_TOKEN,
});

export default function Home() {
  return <Blessing octokit={octokit} />;
}

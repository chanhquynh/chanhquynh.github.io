'use client';

import { Octokit } from 'octokit';

import { Blessing } from './components';

const octokit = new Octokit({
  auth: process.env.AUTH_TOKEN,
});

export default function Home() {
  return <Blessing octokit={octokit} />;
}

import { Octokit } from 'octokit';

import BlessingData from './BlessingData';
import ParticipantData from './ParticipantData';

export default function useOctokit(octokit: Octokit) {
  return {
    getData: async (gistId: string, fileName: string) => {
      return await octokit
        .request(`GET /gists/${gistId}`, {
          gist_id: gistId,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'If-None-Match': '',
          },
        })
        .then((res) => JSON.parse(res.data.files[fileName].content));
    },
    updateData: async (
      gistId: string,
      fileName: string,
      data: ParticipantData[] | BlessingData[]
    ) => {
      return await octokit
        .request(`PATCH /gists/${gistId}`, {
          gist_id: gistId,
          description: 'Update data',
          files: {
            [fileName]: {
              content: JSON.stringify(data),
            },
          },
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .then((res) => res.status);
    },
  };
}

#!/usr/bin/env node
const fs = require('fs');
const { Command } = require('commander');
const { Octokit } = require('@octokit/core');

const program = new Command();
const octokit = new Octokit();

let index = 0;

const file2Base64 = (filePath) => fs.readFileSync(filePath).toString('base64');

const uploadFileToGithub = async (content, fileType, { token, owner, repo, path }) =>
  await octokit.request(`PUT https://api.github.com/repos/{owner}/{repo}/contents/{path}/${Date.now()}${index++}.${fileType}`, {
    headers: {
      Authorization: `token ${token}`
    },
    owner,
    repo,
    path,
    data: {
      'message': 'upload image',
      'content': content
    }
  });

const uploadFileToGitte = async (content, fileType, { token, owner, repo, path }) =>
  await octokit.request(`POST https://gitee.com/api/v5/repos/{owner}/{repo}/contents/{path}/${Date.now()}${index++}.${fileType}`, {
    owner,
    repo,
    path,
    data: {
      'access_token': `${token}`,
      'message': 'upload image',
      'content': content,
    }
  });

const uploadFile = (type) => (filePath, options) => {
  const content = file2Base64(filePath);
  const fileType = filePath.split('.').pop();
  return type === 'gitee' ? uploadFileToGitte(content, fileType, options) : uploadFileToGithub(content, fileType, options);
}

program
  .version('0.0.1');

program
  .command('upload')
  .description('Upload images to github or gitee')
  .option('-t, --token <token>', 'token')
  .option('--type <type>', 'git repo type', 'github')
  .option('-o, --owner <owner>', 'owner')
  .option('-r, --repo <repo>', 'repo')
  .option('-p, --path <path>', 'path')
  .action(async (command) => {
    try {
      const upload = uploadFile(command.type)
      const args = command.args;

      const result = await Promise.all(
        args.map(filePath => upload(
          filePath, command
        ))
      );

      result.forEach(item => {
        console.log(item.data.content.download_url);
      })

    } catch (error) {
      console.log(error);
    }
  });

program.parse(process.argv);

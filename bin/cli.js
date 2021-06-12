#!/usr/bin/env node
const fs = require('fs');
const { Command } = require('commander');
const { Octokit } = require('@octokit/core');

const program = new Command();
const octokit = new Octokit();
let index = 0;

const img2Base64 = (filePath) => {
  const img = fs.readFileSync(filePath);
  const imgBase64 = img.toString('base64');
  return imgBase64;
}

const uploadImg = async (filePath, options) => {
  let result = null;
  const content = img2Base64(filePath);
  const type = filePath.split('.').pop();

  try {
    const { token, owner, repo, path } = options;
    result = await octokit.request(`PUT https://api.github.com/repos/{owner}/{repo}/contents/{path}/${Date.now()}${index++}.${type}`, {
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
  } catch (error) {
    throw error;
  }
  return result;
}

program
  .version('0.0.1');

program
  .command('upload')
  .description('upload a image to github')
  .option('-t, --token <token>', 'token',)
  .option('-o, --owner <owner>', 'owner',)
  .option('-r, --repo <repo>', 'repo',)
  .option('-p, --path <path>', 'path',)
  .action(async (command) => {
    let result = null;
    const args = command.args;

    try {
      result = await Promise.all(
        args.map(filePath => uploadImg(
          filePath, command
        ))
      );
    } catch (error) {
      console.log(error);
    }

    result.forEach(item => {
      console.log(item.data.content.download_url);
    })

  });

program.parse(process.argv);

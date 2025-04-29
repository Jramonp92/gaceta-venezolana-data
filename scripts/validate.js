#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const tags = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/tags.json'), 'utf8'));

function validateGazette(data, filePath) {
  const required = ['fecha','link','resumen','tags'];
  for (const field of required) {
    if (!(field in data)) {
      console.error(`Missing field "${field}" in ${filePath}`);
      return false;
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.fecha)) {
    console.error(`Invalid fecha format in ${filePath}`);
    return false;
  }
  if (!Array.isArray(data.tags)) {
    console.error(`tags is not array in ${filePath}`);
    return false;
  }
  for (const tag of data.tags) {
    if (!tags.includes(tag)) {
      console.error(`Unknown tag "${tag}" in ${filePath}`);
      return false;
    }
  }
  return true;
}

let hasError = false;
const dataDir = path.join(__dirname, '../data');
fs.readdirSync(dataDir).forEach(entry => {
  const entryPath = path.join(dataDir, entry);
  if (fs.lstatSync(entryPath).isDirectory()) {
    fs.readdirSync(entryPath).forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(entryPath, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!validateGazette(data, filePath)) {
          hasError = true;
        }
      }
    });
  }
});
if (hasError) process.exit(1);
console.log('All gazette files are valid');

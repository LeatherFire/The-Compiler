import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { code, language } = req.body;

    let command, args, tempFile;
    switch (language.toLowerCase()) {
      case 'python':
        command = 'python';
        args = ['-c', code];
        break;
      case 'javascript':
        command = 'node';
        args = ['-e', code];
        break;
      case 'c':
        tempFile = path.join('/tmp', `temp_${Date.now()}.c`);
        fs.writeFileSync(tempFile, code);
        command = 'gcc';
        args = [tempFile, '-o', `${tempFile}.out`];
        break;
      case 'c++':
        tempFile = path.join('/tmp', `temp_${Date.now()}.cpp`);
        fs.writeFileSync(tempFile, code);
        command = 'g++';
        args = [tempFile, '-o', `${tempFile}.out`];
        break;
      default:
        return res.status(400).json({ error: 'Unsupported language' });
    }

    if (command === 'gcc' || command === 'g++') {
      const compile = spawn(command, args);

      compile.on('close', (code) => {
        if (code !== 0) {
          return res.status(500).json({ error: `Compilation failed with exit code ${code}` });
        }
        const run = spawn(`${tempFile}.out`);

        run.stdout.on('data', (data) => {
          res.write(data);
        });

        run.stderr.on('data', (data) => {
          res.write(`ERROR: ${data}`);
        });

        run.on('close', (code) => {
          if (tempFile) {
            fs.unlinkSync(tempFile);
            fs.unlinkSync(`${tempFile}.out`);
          }
          res.end();
        });
      });
    } else {
      const run = spawn(command, args);

      run.stdout.on('data', (data) => {
        res.write(data);
      });

      run.stderr.on('data', (data) => {
        res.write(`ERROR: ${data}`);
      });

      run.on('close', (code) => {
        res.end();
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

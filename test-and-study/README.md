# Getting Started

## To run the application, follow these steps:

### First install Node.js v14.x. If you have already installed it, you can skip this step:

**Step 1:** in a web browser, navigate to https://nodejs.org/en/download/. Click the Windows (or MacOS) Installer button to download the latest default version. The Node.js installer includes the NPM package manager.

**Step 2:** install Node.js and NPM from Browser
1. Once the installer finishes downloading, launch it. Open the downloads link in your browser and click the file. Or, browse to the location where you have saved the file and double-click it to launch.
2. The system will ask if you want to run the software – click Run.
3. You will be welcomed to the Node.js Setup Wizard – click Next.
4. On the next screen, review the license agreement. Click Next if you agree to the terms and install the software.
5. The installer will prompt you for the installation location. Leave the default location, unless you have a specific need to install it somewhere else – then click Next.
6. The wizard will let you select components to include or remove from the installation. Again, unless you have a specific need, accept the defaults by clicking Next.
7. Finally, click the Install button to run the installer. When it finishes, click Finish.

**Step 3:** Verify Installation
Open terminal (CMD in Windows), and enter the following command:

```bash
node -v
```

Result: 

```bash
v14.17.5
```

The system should display the Node.js version installed on your system. You can do the same for NPM:

```bash
npm -v
```

Result: 

```bash
8.6.0
```

### Second, clone the project to your local machine and install dependencies:

```bash
git clone https://github.com/arinamomot/test-and-study.git
cd test-and-study
npm install
```

### When downloading is done, you can run the application by enter:

```bash
npm run dev
```

### Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

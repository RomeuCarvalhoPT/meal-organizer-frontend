import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const getConfig = ({ command, mode }) => ({
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
    }
  },
  plugins: [
    react(),
    legacy(),
  ],
})
process.env = {
    ...process.env,
      VITE_API_ENDPOINT: 'https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev' // Replace with your actual backend URL
};

export default getConfig;
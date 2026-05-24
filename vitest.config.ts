import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./test/vitest.setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'json-summary', 'html'],
      include: ['./**/*.(t|j)s'],
      exclude: ['./prisma/generated/*', '.dev/*', 'dist/*'],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});

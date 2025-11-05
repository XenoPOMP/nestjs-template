import { PackageJson } from 'type-fest';

import packageJsonData from '../../package.json';

/**
 * Simply parses ``package.json`` file content.
 */
export function packageConfig() {
  return packageJsonData as PackageJson;
}

import { i18n, i18nInitOptions } from '../i18n';

/**
 * @param additionalNS pass this to avoid wrapping components in a React.Suspense when accessing namespaces
 * that are not loaded by default, and that would be loaded automatically by useTranslation([...])
 */
export function setupI18nTest(
  additionalNS: string[] = [],
): () => Promise<void> {
  return async (): Promise<void> => {
    await i18n.init(i18nInitOptions);

    await i18n.loadNamespaces(['generic', ...additionalNS]);
  };
}

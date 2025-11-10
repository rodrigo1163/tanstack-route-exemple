interface Animal {
  slug: string;
}

/**
 * Busca informações de um animal pelo slug.
 *
 * @function getAnimalsApi
 * @param {Animal} params - Parâmetros para busca do animal.
 * @param {string} params.slug - O slug identificador do animal.
 * @returns {Promise<{slug: string, name: string}>} Retorna um objeto contendo o slug e o nome do animal.
 */
export async function getAnimalsApi({ slug }: Animal) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    slug,
    name: `Animal ${slug}`,
  };
}

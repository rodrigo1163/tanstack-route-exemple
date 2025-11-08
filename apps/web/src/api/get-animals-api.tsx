interface Animal {
  slug: string;
}

export async function getAnimalsApi({ slug }: Animal) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    slug,
    name: `Animal ${slug}`,
  };
}

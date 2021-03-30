module.exports = {
  async redirects() {
    return [
      {
        source: "/api/etudiant/create",
        destination: "/api/etudiant/create",
        permanent: true,
      },
    ];
  },
};

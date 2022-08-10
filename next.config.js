/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
<<<<<<< HEAD
  images: {
    domains: ["images.unsplash.com", "ipfs.infura.io"],
  },
};
=======
	images: {
		domains: [
			'images.unsplash.com',
			'ipfs.infura.io'
		],
	},
}
>>>>>>> d27805bd2e7e1243621946aef3486a919777fbf7

module.exports = nextConfig;

const phones = [
	{
		phoneId: 1,
		name: "iPhone 12",
		brand: "Apple",
		price: 799,
		condition: "Nuevo",
		imageUrl:
			"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-12-black-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202741000",
	},
	{
		phoneId: 2,
		name: "Galaxy S21",
		brand: "Samsung",
		price: 999,
		condition: "Nuevo",
		imageUrl:
			"https://imgs.search.brave.com/xEcCXeGdmKv6s8xkKEOQ8jRqN9WnCeKEdNJqX0FQ8zQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFJV3NxclZNVEwu/anBn",
	},
	{
		phoneId: 3,
		name: "Pixel 5",
		brand: "Google",
		price: 699,
		condition: "Nuevo",
		imageUrl:
			"https://imgs.search.brave.com/IwVIVw3s9_6GLGIkpBhOtVQPD12QYxr2861WJPQjLZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMmU2/Y2N1amIzbWtxZi5j/bG91ZGZyb250Lm5l/dC8zNDU0NzRmNi1l/NjEwLTQ4N2YtYWFl/Yy1jYjRlODMxYWY0/ZDUtMV80Yzg2ZTJi/Yi0zNTZkLTRiZGUt/OWFmOS1iZjJiOGI1/ZDdkNWMuanBn",
	},
	{
		phoneId: 4,
		name: "OnePlus 9 Pro",
		brand: "OnePlus",
		price: 969,
		condition: "Nuevo",
		imageUrl:
			"https://oasis.opstatics.com/content/dam/oasis/page/2021/9-series/spec-image/9-pro/Morning%20mist-gallery.png",
	},
	{
		phoneId: 5,
		name: "Xperia 1 III",
		brand: "Sony",
		price: 129,
		condition: "Nuevo",
		imageUrl:
			"https://www.sony.es/image/bec37fd1196426136aae242507e874b0?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
	},
	{
		phoneId: 6,
		name: "Mi 11 Ultra",
		brand: "Xiaomi",
		price: 119,
		condition: "Nuevo",
		imageUrl:
			"https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1620283511.58026918.png",
	},
	{
		phoneId: 7,
		name: "Mate 40 Pro",
		brand: "Huawei",
		price: 899,
		condition: "Nuevo",
		imageUrl:
			"https://d2e6ccujb3mkqf.cloudfront.net/75fcd005-b40e-4962-bf9c-ca49ffa6da41-1_f9523809-c0d4-4756-a0ec-8a9f560c2a80.jpg",
	},
	{
		phoneId: 8,
		name: "Velvet",
		brand: "LG",
		price: 699,
		condition: "Nuevo",
		imageUrl: "https://i.blogs.es/f197b0/lg-velvet-04/450_1000.jpg",
	},
	{
		phoneId: 9,
		name: "Zenfone 8",
		brand: "Asus",
		price: 699,
		condition: "Nuevo",
		imageUrl:
			"https://www.asusbymacman.es/9127-large_default/asus-zenfone-8-zs590ks-2a007eu-8gb-128gb-negro-smartphone.jpg",
	},
	{
		phoneId: 10,
		name: "Moto G Power",
		brand: "Motorola",
		price: 249,
		condition: "Nuevo",
		imageUrl:
			"https://i5.walmartimages.com/seo/Motorola-Moto-G-Power-2021-64GB-Flash-Gray-Unlocked_cac53b70-a61e-4fa8-a30a-d284944c186f.9058f1ca36b357b99b0b7c6d85529503.png",
	},
	{
		phoneId: 11,
		name: "iPhone 11",
		brand: "Apple",
		price: 599,
		condition: "Usado",
		imageUrl:
			"https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/0194252100776_1.jpg",
	},
	{
		phoneId: 12,
		name: "Galaxy A52",
		brand: "Samsung",
		price: 349,
		condition: "Nuevo",
		imageUrl:
			"https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/3/0/30846_.jpg",
	},
	{
		phoneId: 13,
		name: "Pixel 4a",
		brand: "Google",
		price: 349,
		condition: "Usado",
		imageUrl: "https://m.media-amazon.com/images/I/7199N-Uz2AL._AC_UF894,1000_QL80_.jpg",
	},
	{
		phoneId: 14,
		name: "Nord N10",
		brand: "OnePlus",
		price: 299,
		condition: "Nuevo",
		imageUrl: "https://oasis.opstatics.com/content/dam/oasis/page/billie/N10-Frame.png",
	},
	{
		phoneId: 15,
		name: "Xperia 10 II",
		brand: "Sony",
		price: 349,
		condition: "Usado",
		imageUrl: "https://m.media-amazon.com/images/I/71EXKQEDbeL.jpg",
	},
	{
		phoneId: 16,
		name: "Redmi Note 10",
		brand: "Xiaomi",
		price: 199,
		condition: "Nuevo",
		imageUrl:
			"https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1614762778.51454608.png",
	},
	{
		phoneId: 17,
		name: "P40 Lite",
		brand: "Huawei",
		price: 249,
		condition: "Nuevo",
		imageUrl:
			"https://imgs.search.brave.com/UTwVC2Zm1TnSmVAj6BMnWR49xcJyKjxi8j4Axp7Lxac/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d29ydGVuLmVzL2kv/NjIxZDc4ODU5MmQ4/NGRjMjQzNDBkYjhl/MzIzYTg5ZmVlODRh/MGE2ZC5qcGc",
	},
	{
		phoneId: 18,
		name: "K92",
		brand: "LG",
		price: 399,
		condition: "Nuevo",
		imageUrl: "https://m.media-amazon.com/images/I/617eg68EN7L.jpg",
	},
	{
		phoneId: 19,
		name: "Zenfone 7 Pro",
		brand: "Asus",
		price: 799,
		condition: "Nuevo",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkoGi-am27687vAAnfPFGbsqyRoD60q2RSg&s",
	},
	{
		phoneId: 20,
		name: "Moto E",
		brand: "Motorola",
		price: 149,
		condition: "Nuevo",
		imageUrl: "https://www.notebookcheck.org/uploads/tx_nbc2/MotorolaMotoE2020__1_.JPG",
	},
	{
		phoneId: 21,
		name: "iPhone SE",
		brand: "Apple",
		price: 399,
		condition: "Usado",
		imageUrl: "https://m.media-amazon.com/images/I/31eq5m7D5uL.jpg",
	},
	{
		phoneId: 22,
		name: "Galaxy Note 20",
		brand: "Samsung",
		price: 999,
		condition: "Nuevo",
		imageUrl: "https://movilesquality.com/pics/contenido/samsung-galaxy-note-20-5g.jpg",
	},
	{
		phoneId: 23,
		name: "Pixel 4 XL",
		brand: "Google",
		price: 499,
		condition: "Usado",
		imageUrl:
			"https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/0842776114709_1.jpg",
	},
	{
		phoneId: 24,
		name: "Nord N100",
		brand: "OnePlus",
		price: 179,
		condition: "Nuevo",
		imageUrl: "https://oasis.opstatics.com/content/dam/oasis/page/billie/N100-Frame1.png",
	},
	{
		phoneId: 25,
		name: "Xperia L4",
		brand: "Sony",
		price: 199,
		condition: "Usado",
		imageUrl:
			"https://www.sony.es/image/339852d04efc955c3ca4b8a8ed82c182?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
	},
	{
		phoneId: 26,
		name: "Redmi 9",
		brand: "Xiaomi",
		price: 149,
		condition: "Nuevo",
		imageUrl: "https://miberia.com/5247-full_default/xiaomi-redmi-9-version-global.jpg",
	},
	{
		phoneId: 27,
		name: "P30 Lite",
		brand: "Huawei",
		price: 199,
		condition: "Nuevo",
		imageUrl: "https://m.media-amazon.com/images/I/616+kGLMqJL.jpg",
	},
	{
		phoneId: 28,
		name: "K42",
		brand: "LG",
		price: 299,
		condition: "Nuevo",
		imageUrl:
			"https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8434844384293_1.jpg",
	},
	{
		phoneId: 29,
		name: "Zenfone 6",
		brand: "Asus",
		price: 499,
		condition: "Nuevo",
		imageUrl:
			"https://www.asus.com/media/global/gallery/3mCdQVCxXCZSoqNH_setting_xxx_0_90_end_2000.png",
	},
	{
		phoneId: 30,
		name: "Moto G Stylus",
		brand: "Motorola",
		price: 299,
		condition: "Nuevo",
		imageUrl: "https://cdn-files.kimovil.com/default/0005/60/thumb_459850_default_big.jpeg",
	},
	{
		phoneId: 31,
		name: "iPhone XR",
		brand: "Apple",
		price: 499,
		condition: "Usado",
		imageUrl:
			"https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-xr/iphone-xr-blue.jpg",
	},
	{
		phoneId: 32,
		name: "Galaxy A32",
		brand: "Samsung",
		price: 279,
		condition: "Nuevo",
		imageUrl:
			"https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/3/0/30800_.jpg",
	},
	{
		phoneId: 33,
		name: "Pixel 3a",
		brand: "Google",
		price: 399,
		condition: "Usado",
		imageUrl:
			"https://ae01.alicdn.com/kf/H72102e00caea4c15a76a51f33d94ccfab/Google-Smartphone-Pixel-3a-XL-Original-6-0-Snapdragon-670-ocho-n-cleos-4GB-de-RAM.jpg",
	},
	{
		phoneId: 34,
		name: "Nord N200",
		brand: "OnePlus",
		price: 239,
		condition: "Nuevo",
		imageUrl: "https://oasis.opstatics.com/content/dam/oasis/page/2021/n200/Render_31.png",
	},
	{
		phoneId: 35,
		name: "Xperia 5 II",
		brand: "Sony",
		price: 799,
		condition: "Nuevo",
		imageUrl: "https://www.sony.es/image/7b32689c42298677055313ec98fd0253?fmt=png-alpha&wid=480",
	},
	{
		phoneId: 36,
		name: "Redmi Note 9",
		brand: "Xiaomi",
		price: 179,
		condition: "Nuevo",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3CjYYi2jUvfHt4VayiLb1_Cd6OXp5cZnMQ&s",
	},
	{
		phoneId: 37,
		name: "P Smart 2021",
		brand: "Huawei",
		price: 179,
		condition: "Nuevo",
		imageUrl: "https://m.media-amazon.com/images/I/41VsQlyigGL.jpg",
	},
	{
		phoneId: 38,
		name: "K71",
		brand: "LG",
		price: 349,
		condition: "Nuevo",
		imageUrl:
			"https://media.v2.siweb.es/uploaded_thumb_medium/c2a601e0a129e06a59aef4caa1813653/k71.jpg",
	},
	{
		phoneId: 39,
		name: "Zenfone 5Z",
		brand: "Asus",
		price: 599,
		condition: "Nuevo",
		imageUrl: "https://http2.mlstatic.com/D_NQ_NP_863451-MLA44155922684_112020-O.webp",
	},
	{
		phoneId: 40,
		name: "Moto G Play",
		brand: "Motorola",
		price: 169,
		condition: "Nuevo",
		imageUrl: "https://gagadget.com/media/uploads/moto-g-play-2023-1.jpg",
	},
	{
		phoneId: 41,
		name: "iPhone 8",
		brand: "Apple",
		price: 349,
		condition: "Usado",
		imageUrl:
			"https://movilesquality.com/pics/contenido/4c16bdb377d116ece8b4b8f68ea35ce8_apple-iphone-8-256gb-negro.jpg",
	},
	{
		phoneId: 42,
		name: "Galaxy M31",
		brand: "Samsung",
		price: 249,
		condition: "Nuevo",
		imageUrl:
			"https://d2e6ccujb3mkqf.cloudfront.net/d74a2398-39e5-4ed2-95d1-29bcac279910-1_e7d1c359-35eb-4746-ae7e-b8049535d2a7.jpg",
	},
	{
		phoneId: 43,
		name: "Pixel 3",
		brand: "Google",
		price: 299,
		condition: "Usado",
		imageUrl: "https://i.blogs.es/0145ec/google-pixel-3/1366_2000.jpg",
	},
	{
		phoneId: 44,
		name: "Nord N10 5G",
		brand: "OnePlus",
		price: 299,
		condition: "Nuevo",
		imageUrl: "https://oasis.opstatics.com/content/dam/oasis/page/billie/N10-Frame.png",
	},
	{
		phoneId: 45,
		name: "Xperia 10 Plus",
		brand: "Sony",
		price: 399,
		condition: "Usado",
		imageUrl: "https://m.media-amazon.com/images/I/81e8UT7yb9L.jpg",
	},
	{
		phoneId: 46,
		name: "Redmi 9A",
		brand: "Xiaomi",
		price: 99,
		condition: "Nuevo",
		imageUrl:
			"https://static.electrocosto.com/images/product/medium/59032_xiaomi-redmi-9a-negro.jpg",
	},
	{
		phoneId: 47,
		name: "P40 Pro",
		brand: "Huawei",
		price: 699,
		condition: "Nuevo",
		imageUrl: "https://ilikephone.es/wp-content/uploads/2023/11/HUAWEI-P40-PRO-AZUL.png",
	},
	{
		phoneId: 48,
		name: "K31",
		brand: "LG",
		price: 249,
		condition: "Nuevo",
		imageUrl: "https://static-geektopia.com/storage/t/i/762/76222/300x300/zoom-01.jpg",
	},
	{
		phoneId: 49,
		name: "Zenfone 4 Max",
		brand: "Asus",
		price: 199,
		condition: "Nuevo",
		imageUrl: "https://www.notebookcheck.org/uploads/tx_nbc2/AsusZenfone4MaxPro__3_.JPG",
	},
	{
		phoneId: 50,
		name: "Moto E6",
		brand: "Motorola",
		price: 99,
		condition: "Nuevo",
		imageUrl: "https://i.blogs.es/6ee700/motorola-moto-e6-plus-pantalla/650_1200.jpg",
	},
	{
		phoneId: 51,
		name: "iPhone 12 Pro",
		brand: "Apple",
		price: 999,
		condition: "Nuevo",
		imageUrl:
			"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-12-pro-graphite-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202842000",
	},
	{
		phoneId: 52,
		name: "Galaxy S20 FE",
		brand: "Samsung",
		price: 699,
		condition: "Nuevo",
		imageUrl: "https://www.barcimaster.com/wp-content/uploads/2020/11/Samsung-Galaxy-S20-FE-1.jpg",
	},
	{
		phoneId: 53,
		name: "Pixel 4a 5G",
		brand: "Google",
		price: 499,
		condition: "Nuevo",
		imageUrl: "https://m.media-amazon.com/images/I/71C0OH4WfpL.jpg",
	},
	{
		phoneId: 54,
		name: "Nord CE 5G",
		brand: "OnePlus",
		price: 329,
		condition: "Nuevo",
		imageUrl: "https://oasis.opstatics.com/content/dam/oasis/page/2021/ebba/spec/Blue-Void.png",
	},
	{
		phoneId: 55,
		name: "Xperia 1 II",
		brand: "Sony",
		price: 949,
		condition: "Nuevo",
		imageUrl:
			"https://www.sony.es/image/93375262915162c04b81617da973a2c4?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
	},
	{
		phoneId: 56,
		name: "Redmi Note 8",
		brand: "Xiaomi",
		price: 199,
		condition: "Nuevo",
		imageUrl:
			"https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1623307521.05815420.png",
	},
	{
		phoneId: 57,
		name: "P Smart 2020",
		brand: "Huawei",
		price: 149,
		condition: "Nuevo",
		imageUrl: "https://i.blogs.es/9251b9/huawei-p-smart-2020/original.jpeg",
	},
	{
		phoneId: 58,
		name: "K61",
		brand: "LG",
		price: 399,
		condition: "Nuevo",
		imageUrl: "https://thumbs.ielectro.es/product/med/23547-3.webp",
	},
	{
		phoneId: 59,
		name: "Zenfone 3 Deluxe",
		brand: "Asus",
		price: 699,
		condition: "Nuevo",
		imageUrl: "https://i.blogs.es/c7b9d2/asus-zenfone-3-deluxe-01/1366_2000.jpg",
	},
	{
		phoneId: 60,
		name: "Moto G Fast",
		brand: "Motorola",
		price: 199,
		condition: "Nuevo",
		imageUrl: "https://www.notebookcheck.org/uploads/tx_nbc2/MotorolaMotoGFast__1_.JPG",
	},
	{
		phoneId: 61,
		name: "iPhone 11 Pro",
		brand: "Apple",
		price: 899,
		condition: "Usado",
		imageUrl: "https://cf6.certideal.com/23220-thickbox_default/iphone-11-pro-max-64-gb-plata.jpg",
	},
	{
		phoneId: 62,
		name: "Galaxy A12",
		brand: "Samsung",
		price: 179,
		condition: "Nuevo",
		imageUrl:
			"https://www.hubside.store/media/catalog/product/c/a/capture_d_e_cran_2023-06-06_a_11.43.09_3.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
	},
	{
		phoneId: 63,
		name: "Pixel 3 XL",
		brand: "Google",
		price: 399,
		condition: "Usado",
		imageUrl:
			"https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/0842776108654_1.jpg",
	},
	{
		phoneId: 64,
		name: "Nord N1",
		brand: "OnePlus",
		price: 199,
		condition: "Nuevo",
		imageUrl: "https://www.wimacpc.com/assets/images/products/SM2032/24-03-2022-10-25-01.png",
	},
	{
		phoneId: 65,
		name: "Xperia 10",
		brand: "Sony",
		price: 299,
		condition: "Usado",
		imageUrl:
			"https://i.blogs.es/e83f04/captura-de-pantalla-2022-05-10-a-las-16.52.04/1366_2000.jpeg",
	},
	{
		phoneId: 66,
		name: "Redmi 8",
		brand: "Xiaomi",
		price: 129,
		condition: "Nuevo",
		imageUrl: "https://www.notebookcheck.org/uploads/tx_nbc2/XiaomiRedmi8__1_.JPG",
	},
	{
		phoneId: 67,
		name: "P Smart S",
		brand: "Huawei",
		price: 249,
		condition: "Nuevo",
		imageUrl: "https://cdn-files.kimovil.com/default/0003/77/thumb_276678_default_big.jpeg",
	},
	{
		phoneId: 68,
		name: "K51",
		brand: "LG",
		price: 299,
		condition: "Nuevo",
		imageUrl: "https://wiemx.com/wp-content/uploads/2021/09/LG-K51-1.jpeg",
	},
	{
		phoneId: 69,
		name: "Zenfone 2 Laser",
		brand: "Asus",
		price: 299,
		condition: "Nuevo",
		imageUrl:
			"https://www.maisbaratofone.com.br/wp-content/uploads/2023/07/Zenfone-2-Laser-Cinza1-600x600.jpg",
	},
	{
		phoneId: 70,
		name: "Moto G Power 2021",
		brand: "Motorola",
		price: 249,
		condition: "Nuevo",
		imageUrl:
			"https://i5.walmartimages.com/seo/Motorola-Moto-G-Power-2021-64GB-Flash-Gray-Unlocked_cac53b70-a61e-4fa8-a30a-d284944c186f.9058f1ca36b357b99b0b7c6d85529503.png",
	},
	{
		phoneId: 71,
		name: "iPhone XS",
		brand: "Apple",
		price: 699,
		condition: "Usado",
		imageUrl:
			"https://cdn.idealo.com/folder/Product/6299/0/6299085/s11_produktbild_gross_5/apple-iphone-xs.jpg",
	},
	{
		phoneId: 72,
		name: "Galaxy A02",
		brand: "Samsung",
		price: 129,
		condition: "Nuevo",
		imageUrl:
			"https://www.movileo.com/70813-large_default/samsung-galaxy-a02-364gb-negro-nuevo.jpg",
	},
	{
		phoneId: 73,
		name: "Pixel 4",
		brand: "Google",
		price: 499,
		condition: "Usado",
		imageUrl:
			"https://www.backmarket.es/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d2e6ccujb3mkqf.cloudfront.net/ad1f1f19-5c22-4135-af6b-1687709fd587-1_c34386ef-78e3-4a7a-ad98-64fbe6088cd2.jpg",
	},
	{
		phoneId: 74,
		name: "Nord 2",
		brand: "OnePlus",
		price: 399,
		condition: "Nuevo",
		imageUrl:
			"https://oasis.opstatics.com/content/dam/oasis/page/2021/ebba/spec/nord2_Blue_Haze.png",
	},
	{
		phoneId: 75,
		name: "Xperia 5",
		brand: "Sony",
		price: 699,
		condition: "Nuevo",
		imageUrl:
			"https://www.sony.es/image/dae23edc294287acc10c6b6125d5e2a3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
	},
	{
		phoneId: 76,
		name: "Redmi Note 7",
		brand: "Xiaomi",
		price: 149,
		condition: "Nuevo",
		imageUrl: "https://m.media-amazon.com/images/I/81ClITpVLhL.jpg",
	},
	{
		phoneId: 77,
		name: "P40 Lite E",
		brand: "Huawei",
		price: 179,
		condition: "Nuevo",
		imageUrl:
			"https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/2/9/29766.-huawei-p40-lite-e-4gb-64gb-dual-sim-azul.jpg",
	},
	{
		phoneId: 78,
		name: "K40",
		brand: "LG",
		price: 199,
		condition: "Nuevo",
		imageUrl:
			"https://img.gkbcdn.com/p/2021-05-05/xiaomi-redmi-k40-gaming-edition-cn-version-6-67--12gb-256gb-black-1620200098560._w500_p1_.jpg",
	},
	{
		phoneId: 79,
		name: "Zenfone 6Z",
		brand: "Asus",
		price: 699,
		condition: "Nuevo",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTauEQHVcpeYfbGGNBy03zrCWx-g_rPrAnXLA&s",
	},
	{
		phoneId: 80,
		name: "Moto G9 Play",
		brand: "Motorola",
		price: 199,
		condition: "Nuevo",
		imageUrl: "https://i.blogs.es/befed4/moto-g9-03/450_1000.jpg",
	},
	{
		phoneId: 81,
		name: "iPhone 7",
		brand: "Apple",
		price: 249,
		condition: "Usado",
		imageUrl: "https://movilesquality.com/pics/contenido/apple-iphone-7-128gb-rojo.jpg",
	},
	{
		phoneId: 82,
		name: "Galaxy M21",
		brand: "Samsung",
		price: 199,
		condition: "Nuevo",
		imageUrl:
			"https://movilesquality.com/pics/contenido/samsung-galaxy-m21-4-64gb-negro-libre-foto.jpg",
	},
	{
		phoneId: 83,
		name: "Pixel 3a XL",
		brand: "Google",
		price: 449,
		condition: "Usado",
		imageUrl: "https://m-cdn.phonearena.com/images/phones/75922-150/Google-Pixel-3a-XL-8z.jpg?w=1",
	},
	{
		phoneId: 84,
		name: "Nord SE",
		brand: "OnePlus",
		price: 279,
		condition: "Nuevo",
		imageUrl: "https://www.powerplanetonline.com/cdnassets/oneplus_nord_n30_se_negro_00_l.jpg",
	},
	{
		phoneId: 85,
		name: "Xperia 10 II",
		brand: "Sony",
		price: 349,
		condition: "Nuevo",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicWbxebxCbEtdMjB37GXTGII6vX5avXhcMA&s",
	},
	{
		phoneId: 86,
		name: "Redmi 7",
		brand: "Xiaomi",
		price: 99,
		condition: "Nuevo",
		imageUrl:
			"https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8948019620142_1.jpg",
	},
	{
		phoneId: 87,
		name: "P Smart Pro",
		brand: "Huawei",
		price: 299,
		condition: "Nuevo",
		imageUrl:
			"https://www.notebookcheck.org/typo3temp/_processed_/e/9/csm_Huawei-P-Smart-2019-554x554_971b9ee135.jpg",
	},
	{
		phoneId: 88,
		name: "K50",
		brand: "LG",
		price: 349,
		condition: "Nuevo",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpXkQUuNu9Z-8cvG2spkBos6RuAQbKluW3VA&s",
	},
	{
		phoneId: 89,
		name: "Zenfone 5 Lite",
		brand: "Asus",
		price: 299,
		condition: "Nuevo",
		imageUrl: "https://www.notebookcheck.org/uploads/tx_nbc2/AsusZenFone5Lite.JPG",
	},
	{
		phoneId: 90,
		name: "Moto E7",
		brand: "Motorola",
		price: 99,
		condition: "Nuevo",
		imageUrl:
			"https://motorolaes.vtexassets.com/arquivos/ids/157756-800-auto?width=800&height=auto&aspect=true",
	},
	{
		phoneId: 91,
		name: "iPhone 12 Mini",
		brand: "Apple",
		price: 699,
		condition: "Nuevo",
		imageUrl:
			"https://thumb.pccomponentes.com/w-530-530/articles/32/328965/1626-apple-iphone-12-mini-256gb-negro-libre.jpg",
	},
	{
		phoneId: 92,
		name: "Galaxy A42",
		brand: "Samsung",
		price: 349,
		condition: "Nuevo",
		imageUrl:
			"https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8806090862014_1.jpg",
	},
	{
		phoneId: 93,
		name: "Pixel 5a",
		brand: "Google",
		price: 449,
		condition: "Nuevo",
		imageUrl: "https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/Untitled5598.png",
	},
	{
		phoneId: 94,
		name: "Nord CE",
		brand: "OnePlus",
		price: 329,
		condition: "Nuevo",
		imageUrl: "https://m.media-amazon.com/images/I/51u8DpWulsL.jpg",
	},
	{
		phoneId: 95,
		name: "Xperia 1",
		brand: "Sony",
		price: 899,
		condition: "Nuevo",
		imageUrl:
			"https://www.sony.es/image/bec37fd1196426136aae242507e874b0?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
	},
	{
		phoneId: 96,
		name: "Redmi Note 6 Pro",
		brand: "Xiaomi",
		price: 179,
		condition: "Nuevo",
		imageUrl:
			"https://oselection.es/sites/default/files/xiaomi-redmi-note-6-pro-32gb-internos-3gb-ram-versi%C3%B3n-global-rosa.jpg",
	},
	{
		phoneId: 97,
		name: "P Smart Z",
		brand: "Huawei",
		price: 199,
		condition: "Nuevo",
		imageUrl:
			"https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/list-image/phones/p-smart-z/p-smart-z-black.png",
	},
	{
		phoneId: 98,
		name: "K41",
		brand: "LG",
		price: 279,
		condition: "Nuevo",
		imageUrl: "https://movilstarhn.com/wp-content/uploads/2020/09/LG-K41-LG-K41-ANDROID.jpg",
	},
	{
		phoneId: 99,
		name: "Zenfone 4 Selfie",
		brand: "Asus",
		price: 199,
		condition: "Nuevo",
		imageUrl: "https://static-geektopia.com/storage/t/i/466/46651/xh8ojrhipzgbtxi1_setting_.webp",
	},
	{
		phoneId: 100,
		name: "Moto G10",
		brand: "Motorola",
		price: 149,
		condition: "Nuevo",
		imageUrl: "https://m.media-amazon.com/images/I/81muIGaUrhL.jpg",
	},
];

module.exports = phones;

import "../styles/main.css";

import PageHeader from '../components/page/header'
import PageFooter from '../components/page/footer'

function MyApp({ Component, pageProps }) {
	const hasFrame = !(Component?.layout === 'withoutFrame')
  return (
    <div id="app" className={`bg-background ${ hasFrame ? 'grid-rows-framework' : 'h-full' }`}>
			{ hasFrame ? <PageHeader /> : '' }
			<main id="pageContent" className="flex flex-row justify-center">
				<div className="container py-1 grid grid-cols-12 lg:justify-center">
					<div className="w-full h-full p-4 md:pb-12 col-span-12 md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 overflow-scroll">
						<Component {...pageProps} />
					</div>
				</div>
			</main>
			{ hasFrame ? <PageFooter /> : '' }
    </div>
  );
}

export default MyApp;

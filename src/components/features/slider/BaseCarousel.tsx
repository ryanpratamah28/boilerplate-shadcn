// React
import React, { Children, useRef } from "react";

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	Thumbs,
	FreeMode,
} from "swiper/modules";

import type { Swiper as SwiperType, SwiperOptions } from "swiper/types";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// Icons
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Types
interface BaseCarouselProps {
	children: React.ReactNode;
	options?: SwiperOptions;
	className?: string;
	showNavigation?: boolean;
	showPagination?: boolean;
	navClassName?: string;
	slideClassName?: string;
	paginationPosition?: "left" | "center" | "right";
	onSwiper?: (swiper: SwiperType) => void;
}

const BaseCarousel: React.FC<BaseCarouselProps> = ({
	children,
	options,
	className,
	showNavigation,
	showPagination,
	paginationPosition = "left",
	navClassName,
	slideClassName,
	onSwiper,
}) => {
	const swiperRef = useRef<SwiperType | null>(null);

	const defaultOptions: SwiperOptions = {
		modules: [
			Navigation,
			Pagination,
			Autoplay,
			EffectFade,
			Thumbs,
			FreeMode,
		],
		spaceBetween: 20,
		slidesPerView: 1,
		pagination: showPagination
			? { clickable: true, el: ".swiper-pagination" }
			: false,
		loop: true,
	};

	const combinedOptions = { ...defaultOptions, ...options };

	const paginationPositionClasses = {
		left: "!text-start",
		center: "!text-center",
		right: "!text-end",
	};

	const paginationClasses = `swiper-pagination w-full mt-2 ${paginationPositionClasses[paginationPosition]}`;

	return (
		<div className="flex flex-col">
			<div className={`relative ${className}`}>
				<Swiper
					{...combinedOptions}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						onSwiper?.(swiper);
					}}
					className="w-full h-full"
				>
					{Children.map(children, (child, index) => (
						<SwiperSlide
							key={index}
							className={`self-stretch h-auto ${slideClassName}`}
						>
							{child}
						</SwiperSlide>
					))}
				</Swiper>

				{showNavigation && (
					<>
						<button
							onClick={() => swiperRef.current?.slidePrev()}
							className={`absolute top-1/2 -translate-y-1/2 left-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-800/40 text-white rounded-full shadow-md hover:bg-gray-800/60 transition-all disabled:opacity-50 ${navClassName}`}
						>
							<IconChevronLeft size={24} />
						</button>

						<button
							onClick={() => swiperRef.current?.slideNext()}
							className={`absolute top-1/2 -translate-y-1/2 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-800/40 text-white rounded-full shadow-md hover:bg-gray-800/60 transition-all disabled:opacity-50 ${navClassName}`}
						>
							<IconChevronRight size={24} />
						</button>
					</>
				)}
			</div>

			{showPagination && <div className={paginationClasses}></div>}
		</div>
	);
};

export default BaseCarousel;

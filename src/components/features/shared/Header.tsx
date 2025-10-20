// Icons
import {
	IconDeviceMobile,
	IconHeadset,
	IconChevronDown,
} from "@tabler/icons-react";

const Header = () => {
	return (
		<header className="sticky container-fluid top-0 z-50 bg-white border-b border-gray-200 w-full">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-12 text-sm text-gray-700">
					<a
						href="#"
						className="flex items-center gap-x-2 hover:text-blue-600 transition-colors duration-200"
					>
						<IconDeviceMobile size={18} strokeWidth={1.5} />
						<span>Download App</span>
					</a>

					<div className="flex items-center gap-x-4">
						<a
							href="#"
							className="flex items-center gap-x-2 hover:text-blue-600 transition-colors duration-200"
						>
							<IconHeadset size={18} strokeWidth={1.5} />
							<span>Need Help ?</span>
						</a>

						<div
							className="h-4 w-px bg-gray-300"
							aria-hidden="true"
						/>

						<button
							type="button"
							className="flex items-center gap-x-1 hover:text-blue-600 transition-colors duration-200"
						>
							<span>Language</span>

							<IconChevronDown size={16} strokeWidth={1.5} />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;

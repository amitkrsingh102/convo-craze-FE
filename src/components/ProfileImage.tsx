import { avatar } from "../utils/avatarImports";
type ProfileImageProps = {
	large?: boolean;
	xl?: boolean;
	src: number;
};
const ProfileImage = ({
	large = true,
	src = 30,
	xl = false,
}: ProfileImageProps) => {
	const sizeProps = xl ? "w-24 h-24" : large ? "w-14 h-14" : "w-12 h-12";
	return (
		<div
			className={`rounded-full  ${sizeProps} flex items-center object-cover cursor-pointer`}
		>
			<img src={avatar[src]} alt="img" />
		</div>
	);
};

export default ProfileImage;

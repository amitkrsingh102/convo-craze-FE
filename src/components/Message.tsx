import { convertToTime } from "../utils/timeEval";

type MessageProps = {
	sender: boolean;
	text: string;
	time: string;
};
const Message = ({ sender, text, time }: MessageProps) => {
	const senderStyle = sender
		? "ml-10 mt-2 rounded-e-xl rounded-b-xl bg-gray-800 text-slate-100"
		: "mr-10 mt-2 rounded-s-xl rounded-b-xl bg-blue-700 text-slate-100";
	// console.log(time);
	return (
		<div className={`flex ${sender ? "" : "flex-row-reverse"}`}>
			<div
				className={`flex px-4 py-2 ${senderStyle} items-center justify-between gap-4  max-w-sm`}
			>
				<span className="h-auto break-words whitespace-break-spaces">
					{/* <img
						src={tests}
						alt="userName"
						className="max-w-[calc(200px)] max-h-[calc(200px)] object-cover"
					/> */}
					<span>{text}</span>
				</span>
				<span className="-mx-2 mt-auto text-[calc(9px)] text-gray-200">
					{convertToTime(time)}
				</span>
			</div>
		</div>
	);
};

export default Message;

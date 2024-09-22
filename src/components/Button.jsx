export const Button = ({title, disabledState}) => (
    <button
        className="hover:bg-cyan-500 disabled:bg-zinc-500 hover:text-zinc-900 transition-all delay-[50] ease-in-out bg-white text-black font-semibold rounded-xl px-2 py-2"
        disabled={disabledState}
        >
            {title}
    </button>
)
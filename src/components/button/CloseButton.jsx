import { X } from 'lucide-react';


const CloseButton = ({action}) => {
    return (
        <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(122,46,29,0.1)] text-[var(--themeColor)] hover:bg-[rgba(122,46,29,0.2)] transition-colors"
            onClick={action}
        >
            <X size={20}  />
        </button>
    )
}

export default CloseButton

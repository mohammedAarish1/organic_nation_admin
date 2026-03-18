import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react';

const SubmitButton = ({
    id = 'btn',
    isSubmitting = false,
    text,
    action = null,
    disabled = false,
    type = "submit"
}) => {
    const isDisabled = isSubmitting || disabled;

    return (
        <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <button
                id={id}
                type={type}
                disabled={isDisabled}
                onClick={action ? action : undefined}
                className={`
                    w-full py-3 px-6 rounded-lg 
                    flex items-center justify-center space-x-2
                    text-[var(--text-light-color)] font-medium text-lg
                    bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)]
                    hover:from-[var(--accent-color)] hover:to-[var(--themeColor)]
                    transition-all duration-300 ease-in-out
                    transform hover:scale-[1.02] active:scale-[0.98]
                    focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] focus:ring-opacity-50
                    shadow-lg hover:shadow-xl
                    ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}
                `}
            >
                <span>{text}</span>
                <motion.span
                    animate={{ x: isSubmitting ? 0 : [0, 5, 0] }}
                    transition={{ repeat: isSubmitting ? 0 : Infinity, duration: 1.5 }}
                >
                    {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <ArrowRight />
                    )}
                </motion.span>
            </button>
        </motion.div>
    )
}

export default SubmitButton
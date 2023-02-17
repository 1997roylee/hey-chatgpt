import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { OpenAI } from './OpenAI'

interface Props {
    onClick?: () => void
}

export const Cursor = ({ onClick }: Props): JSX.Element => {
    return (
        <Box
            sx={{
                zIndex: 9999,
                position: 'relative',
            }}
            right={6}
            bottom={6}
            onClick={onClick}
        >
            <Box
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    '--shadow-1': 'rgba(0, 0, 0, 0.1)',
                    '--shadow-2': 'rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
                    cursor: 'pointer',
                    padding: 2,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.21 }}
                >
                    <OpenAI />
                </motion.div>
            </Box>
        </Box>
    )
}

import { Box } from '@mantine/core'
import { OpenAi } from './OpenAi'

interface Props {
    onClick?: () => void
}

export const Cursor = ({ onClick }: Props): JSX.Element => {
    return (
        <Box
            sx={{
                // zIndex: 9999,
                position: 'relative',
            }}
            right={24}
            bottom={24}
            onClick={onClick}
        >
            <Box
                sx={{
                    width: 64 - 16,
                    height: 64 - 16,
                    borderRadius: 64 / 2,
                    backgroundColor: '#fff',
                    '--shadow-1': 'rgba(0, 0, 0, 0.1)',
                    '--shadow-2': 'rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
                    cursor: 'pointer',
                    padding: 8,
                }}
            >
                <OpenAi />
                {/* <Image src={Openai} w='100%' h='100%' /> */}
            </Box>
        </Box>
    )
}

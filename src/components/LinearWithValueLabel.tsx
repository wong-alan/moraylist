import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LinearProgressWithLabelProps {
    label: string
    progress: number,
}

const LinearProgressWithLabel = (
    {label, progress}: LinearProgressWithLabelProps
) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                        color="success"
                        variant="determinate"
                        value={progress}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography
                        variant="body2"
                        color="#FFFFFF"
                        sx={{fontFamily: "Metropolis"}}
                    >
                        {label}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default LinearProgressWithLabel
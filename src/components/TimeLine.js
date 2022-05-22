import { useTheme } from "@mui/system";
import { useEventState } from "../contexts/EventProvider";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useFilterState } from "../contexts/FilterProvider";

export default function TimeLine() {
  const { events } = useEventState();
  const { setAtDate, atDate } = useFilterState();
  const theme = useTheme();

  const [animate, setAnimate] = useState(true);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const steps = [
    ...events.reduce((dates, e) => {
      dates.add(new Date(e.date_start).toDateString());
      return dates;
    }, new Set()),
  ];

  useEffect(() => {
    setAtDate(steps[activeStep]);
  });

  const totalSteps = () => steps.length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const completedSteps = () => Object.keys(completed).length;
  const allStepsCompleted = () => completedSteps() === totalSteps();
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          0
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const isActive = (id) => activeStep === id;

  useEffect(() => {
    const timer = setInterval(() => {
      if (animate) handleNext();
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <Box
      sx={{
        width: "calc(100% - 20px)",
        backgroundColor: theme.palette.background.default,
        margin: "10px",
      }}
      className="timeline-overlay"
    >
      <label>Auto next: </label>
      <input
        type="checkbox"
        checked={animate}
        onChange={(e) => setAnimate(e.target.checked)}
      />
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ overflow: "auto", paddingBottom: "15px" }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step
              key={label}
              {...stepProps}
              onClick={() => {
                setActiveStep(index);
                setAnimate(false);
              }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
              {isActive(index) ? <></> : null}
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}

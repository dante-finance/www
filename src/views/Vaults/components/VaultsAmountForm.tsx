import React, {
  FormEventHandler,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import Slider, { SliderProps } from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useMutation } from 'react-query';

import { useComponentId } from 'hooks/useComponentId';

interface VaultsAmountFormProps<T> {
  inputMax: number;
  inputLabel: string;
  inputDesc: ReactNode;

  submitLabel: string;

  handleSubmitRequest: (amount: number) => Promise<T>;

  onSuccess: (value: T) => void;
  onError?: () => void;
}

export function VaultsAmountForm<T>(
  props: VaultsAmountFormProps<T>,
): JSX.Element {
  const {
    inputMax,
    inputLabel,
    inputDesc,
    submitLabel,
    handleSubmitRequest,
    onSuccess,
    onError,
  } = props;

  const [amount, setAmount] = useState(0);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSliderChange = useCallback<
    Exclude<SliderProps['onChange'], undefined>
  >((_event, value) => {
    setAmount(Number.isNaN(value) ? 0 : (value as number));
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(
      Number.isNaN(event.target.value)
        ? 0
        : (event.target.value as unknown as number),
    );
  };

  const updateMutation = useMutation(handleSubmitRequest, {
    onSuccess(data) {
      setSubmitSuccess(true);
      onSuccess(data);
    },
    onError() {
      setSubmitError(true);
      if (onError) {
        onError();
      }
    },
  });
  const { mutate } = updateMutation;

  const handleSubmit = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      setSubmitSuccess(false);
      setSubmitError(false);
      mutate(amount);
    },
    [amount, mutate],
  );

  const handleMaxValue = useCallback(() => {
    setAmount(inputMax);
  }, [inputMax]);

  const textFieldID = useComponentId();

  return (
    <form onSubmit={handleSubmit}>
      {submitSuccess && <Alert>Submit success!</Alert>}

      {submitError && <Alert severity="error">Submit error!</Alert>}

      <Grid
        justifyContent="space-between"
        container
        style={{ marginBottom: '10px' }}
      >
        <Grid item>{inputDesc}</Grid>

        <Grid item>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handleMaxValue}
          >
            Max
          </Button>
        </Grid>
      </Grid>

      <TextField
        id={textFieldID}
        label="Amount"
        variant="outlined"
        style={{ width: '100%' }}
        value={amount}
        onChange={handleTextChange}
      />

      <Slider
        aria-label={inputLabel}
        value={amount}
        min={0}
        max={inputMax}
        step={0.001}
        onChange={handleSliderChange}
      />

      <Button
        color="primary"
        variant="contained"
        type="submit"
        disabled={inputMax === 0 || !amount || updateMutation.isLoading}
      >
        {submitLabel}
      </Button>
    </form>
  );
}

import React, {
  FormEventHandler,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useMutation } from 'react-query';

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

  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  // @todo review slider props
  const handleSliderChange = useCallback((_event, value) => {
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

  const handleOnMax = useCallback(async () => {
    setAmount(inputMax);
  }, [inputMax]);

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
            onClick={handleOnMax}
          >
            Max
          </Button>
        </Grid>
      </Grid>

      {/* @todo A11Y unique ids*/}
      <TextField
        id="amount"
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

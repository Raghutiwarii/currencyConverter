import { useCurrency } from '../hooks/useCurrency';
import { RepeatIcon } from '@chakra-ui/icons';
import { Text, Spinner, Box, Grid, GridItem } from '@chakra-ui/react';
import { FormLabel, Input, Avatar, Flex, Select } from '@chakra-ui/react';

const ConverterInput = ({ value, onAmountChange }) => {
  return (
    <>
      <FormLabel htmlFor="amount" fontWeight="bold" color="purple.500">
        Amount
      </FormLabel>
      <Input
        id="amount"
        size="lg"
        type="number"
        min={0}
        value={value}
        onChange={(e) => onAmountChange(e.target.value)}
      />
    </>
  );
};

const ConverterDisplay = ({
  amount,
  currencyOne,
  currencyTwo,
  convertedAmount,
  date,
  time,
}) => {
  return (
    <Box textAlign="right">
      <Text fontSize="lg" fontWeight="bold">
        {amount} {currencyOne}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color="purple.500">
        {convertedAmount} {currencyTwo}
      </Text>
      <Text fontSize="xs" color="gray.500">
        Market rates collected - {date} {time}
      </Text>
    </Box>
  );
};



const ConverterHeader = () => {
  return (
    <Box
      textAlign="center"
      color="white"
      margin={{ base: '10', sm: '16' }}
      marginBottom="10"
    >
      <Text fontWeight="bold" fontSize={{ base: '2xl', sm: '3xl' }}>
        Currency Converter
      </Text>
      <Text fontWeight="light" fontSize="xs">
        TodayPay Live Rates
      </Text>
    </Box>
  );
};


const ConverterOption = ({
  symbol,
  currencyList,
  onCurrencyChange,
  currency,
}) => {

  const flagUrl = `https://wise.com/public-resources/assets/flags/rectangle/${currency.toLowerCase()}.png`;
  return (
    <Flex gap="1rem" shadow="md" padding="1rem" borderRadius="lg">
      <Avatar src={flagUrl} size="xs" />
      <Select
        variant="unstyled"
        size="md"
        defaultValue={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencyList.map((currency) => (
          <option key={currency} value={currency}>
            {currency} - {symbol[currency]}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

const Converter = () => {
  const {
    amount,
    setAmount,
    currencyOne,
    setCurrencyOne,
    currencyTwo,
    setCurrencyTwo,
    symbolsData,
    isLoading,
    isError,
    convertedAmount,
    date,
    time,
    currencyList,
  } = useCurrency();

  if (isError)
    return (
      <Text fontWeight="bold" fontSize="3xl" color="red" my="10">
        Something has gone wrong
      </Text>
    );

  if (isLoading)
    return (
      <Spinner
        margin="auto 0"
        size="xl"
        thickness="4px"
        speed="0.6s"
        color="purple.500"
        emptyColor="purple.200"
      />
    );
  return (
    <Box width={{ base: '90vw', sm: '65vw' }} margin="0 auto">
      <ConverterHeader />
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(2, 1fr)"
        padding={{ base: '6', sm: '10' }}
        gap="1rem"
        backgroundColor="white"
        borderRadius="lg"
      >
        <GridItem
          colSpan={{ base: 5, sm: 2 }}
          justifySelf="center"
          alignSelf="center"
        >
          <ConverterOption
            symbol={symbolsData.data}
            currencyList={currencyList}
            onCurrencyChange={setCurrencyOne}
            currency={currencyOne}
          />
        </GridItem>
        <GridItem
          display={{ base: 'none', sm: 'block' }}
          colSpan={1}
          justifySelf="center"
          alignSelf="center"
        >
          <RepeatIcon boxSize="2rem" color="purple.300" />
        </GridItem>
        <GridItem
          colSpan={{ base: 5, sm: 2 }}
          justifySelf="center"
          alignSelf="center"
        >
          <ConverterOption
            symbol={symbolsData.data}
            currencyList={currencyList}
            onCurrencyChange={setCurrencyTwo}
            currency={currencyTwo}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <ConverterInput value={amount} onAmountChange={setAmount} />
        </GridItem>
        <GridItem colSpan={3} justifySelf="right" alignSelf="right">
          <ConverterDisplay
            amount={amount}
            currencyOne={currencyOne}
            currencyTwo={currencyTwo}
            convertedAmount={convertedAmount}
            date={date}
            time={time}
          />
        </GridItem>
      </Grid>
      <Text
        textAlign="center"
        marginTop="1.5rem"
        color="whiteAlpha.600"
        fontSize="sm"
      >
      </Text>
    </Box>
  );
};

export default Converter;

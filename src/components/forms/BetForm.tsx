import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { BetFormData, Bet, BettingPlatform, RaceType } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { SPORTS, AUSTRALIAN_STATES, TRACKS, BETTING_PLATFORMS, RACE_TYPES } from '../../utils/constants';
import { format } from 'date-fns';

interface BetFormProps {
  bet?: Bet;
  onSubmit: (data: BetFormData) => void;
  onCancel: () => void;
}

export const BetForm: React.FC<BetFormProps> = ({ bet, onSubmit, onCancel }) => {
  const [selectedState, setSelectedState] = useState(bet?.state || '');
  const [availableTracks, setAvailableTracks] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<BetFormData>({
    defaultValues: bet ? {
      date: format(bet.date, 'yyyy-MM-dd'),
      sport: bet.sport,
      platform: bet.platform,
      stake: bet.stake,
      return: bet.return,
      raceType: bet.raceType,
      state: bet.state,
      track: bet.track,
      notes: bet.notes || ''
    } : {
      date: format(new Date(), 'yyyy-MM-dd'),
      sport: '',
      platform: BETTING_PLATFORMS[0] as BettingPlatform,
      stake: 0,
      return: 0,
      raceType: RACE_TYPES[0] as RaceType,
      state: '',
      track: '',
      notes: ''
    }
  });

  const watchedStake = watch('stake');
  const watchedReturn = watch('return');

  // Update available tracks when state changes
  useEffect(() => {
    if (selectedState && TRACKS[selectedState as keyof typeof TRACKS]) {
      setAvailableTracks(TRACKS[selectedState as keyof typeof TRACKS]);
    } else {
      setAvailableTracks([]);
    }
  }, [selectedState]);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setValue('state', value);
    setValue('track', ''); // Reset track when state changes
  };

  const handleFormSubmit = (data: BetFormData) => {
    onSubmit(data);
  };

  const calculateProfitLoss = () => {
    const stake = Number(watchedStake) || 0;
    const returnAmount = Number(watchedReturn) || 0;
    return returnAmount - stake;
  };

  const profitLoss = calculateProfitLoss();

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date */}
        <Input
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register('date', { required: 'Date is required' })}
        />

        {/* Sport */}
        <Select
          label="Sport"
          options={SPORTS.map(sport => ({ value: sport, label: sport }))}
          placeholder="Select sport"
          error={errors.sport?.message}
          value={watch('sport')}
          onChange={(value) => setValue('sport', value)}
        />

        {/* Platform */}
        <Select
          label="Betting Platform"
          options={BETTING_PLATFORMS.map(platform => ({ value: platform, label: platform }))}
          placeholder="Select platform"
          error={errors.platform?.message}
          value={watch('platform')}
          onChange={(value) => setValue('platform', value as BettingPlatform)}
        />

        {/* Race Type */}
        <Select
          label="Race Type"
          options={RACE_TYPES.map(type => ({ value: type, label: type }))}
          placeholder="Select race type"
          error={errors.raceType?.message}
          value={watch('raceType')}
          onChange={(value) => setValue('raceType', value as RaceType)}
        />

        {/* State */}
        <Select
          label="State"
          options={AUSTRALIAN_STATES.map(state => ({ value: state, label: state }))}
          placeholder="Select state"
          error={errors.state?.message}
          value={selectedState}
          onChange={handleStateChange}
        />

        {/* Track */}
        <Select
          label="Track"
          options={availableTracks.map(track => ({ value: track, label: track }))}
          placeholder={selectedState ? "Select track" : "Select state first"}
          disabled={!selectedState}
          error={errors.track?.message}
          value={watch('track')}
          onChange={(value) => setValue('track', value)}
        />

        {/* Stake */}
        <Input
          label="Stake ($)"
          type="number"
          step="0.01"
          min="0"
          error={errors.stake?.message}
          {...register('stake', { 
            required: 'Stake is required',
            min: { value: 0, message: 'Stake must be positive' }
          })}
        />

        {/* Return */}
        <Input
          label="Return ($)"
          type="number"
          step="0.01"
          min="0"
          error={errors.return?.message}
          {...register('return', { 
            required: 'Return is required',
            min: { value: 0, message: 'Return must be positive' }
          })}
        />
      </div>

      {/* Profit/Loss Display */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Profit/Loss:</span>
          <span className={`text-lg font-bold ${profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
            ${profitLoss.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (Optional)
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows={3}
          placeholder="Add any additional notes..."
          {...register('notes')}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          {bet ? 'Update Bet' : 'Add Bet'}
        </Button>
      </div>
    </form>
  );
}; 
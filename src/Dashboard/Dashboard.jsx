import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Example list of stock tickers for autocomplete suggestions
const stockTickers = [
  'AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA',
  'NFLX', 'NVDA', 'META', 'BABA', 'DIS',
];

const Dashboard = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredTickers, setFilteredTickers] = useState(stockTickers);
  const navigate = useNavigate();

  // Handle input changes and filter suggestions
  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSearchInput(value);
    setFilteredTickers(
      stockTickers.filter((ticker) =>
        ticker.toUpperCase().startsWith(value)
      )
    );
  };

  // Handle selection of a stock ticker
  const handleSelectTicker = (ticker) => {
    navigate(`/dashboard/ticker/${ticker}`);
    
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gray-50 min-h-full">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

      {/* Options Checker Box */}
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Check Stock Options</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter Stock Ticker"
            value={searchInput}
            onChange={handleInputChange}
            className="w-full"
          />
          {filteredTickers.length > 0 && (
            <ul className="bg-gray-100 rounded-lg shadow-inner max-h-40 overflow-y-auto">
              {filteredTickers.map((ticker) => (
                <li
                  key={ticker}
                  onClick={() => handleSelectTicker(ticker)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-800"
                >
                  {ticker}
                </li>
              ))}
            </ul>
          )}
          <Button onClick={() => handleSelectTicker(searchInput)} variant="default">
            Search
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder Cards for More Features */}
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">More Features Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Stay tuned for additional tools and analytics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

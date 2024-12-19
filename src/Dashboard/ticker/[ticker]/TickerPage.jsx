import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { fetchOptionsData, evaluateOption } from '@/service/GlobalAPI';

const TickerPage = () => {
  const { ticker } = useParams(); // Get the ticker from the URL
  const [optionsData, setOptionsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Fetch options data when the page loads
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await fetchOptionsData(ticker);
        setOptionsData(data);
      } catch (error) {
        console.error('Error fetching options data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [ticker]);

  const handleEvaluate = async (optionType, optionData) => {
    const payload = {
      option: optionType,
      data: [optionData.expiration_date, optionData],
    };

    try {
      const result = await evaluateOption(payload);
      setEvaluationResult(result);
    } catch (error) {
      console.error('Error evaluating option:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading options data...</p>
      </div>
    );
  }

  if (!optionsData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No data available for {ticker}.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Options for {ticker.toUpperCase()}
      </h1>

      {optionsData.options.map((option, index) => (
        <Card key={index} className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Expiration Date: {option.expiration_date}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <h3 className="text-md font-medium text-gray-700">Call Options</h3>
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 text-left">Contract Symbol</th>
                    <th className="border border-gray-200 p-2 text-right">Strike</th>
                    <th className="border border-gray-200 p-2 text-right">Last Price</th>
                    <th className="border border-gray-200 p-2 text-right">Bid</th>
                    <th className="border border-gray-200 p-2 text-right">Ask</th>
                    <th className="border border-gray-200 p-2 text-right">Volume</th>
                    <th className="border border-gray-200 p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {option.calls.map((call, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2">{call.contractSymbol}</td>
                      <td className="border border-gray-200 p-2 text-right">{call.strike}</td>
                      <td className="border border-gray-200 p-2 text-right">{call.lastPrice}</td>
                      <td className="border border-gray-200 p-2 text-right">{call.bid}</td>
                      <td className="border border-gray-200 p-2 text-right">{call.ask}</td>
                      <td className="border border-gray-200 p-2 text-right">{call.volume}</td>
                      <td className="border border-gray-200 p-2 text-right">
                      <Dialog>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => handleEvaluate('call', { ...call, expiration_date: option.expiration_date })}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Evaluate
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <DialogTitle className="text-lg font-bold mb-4 text-gray-800">Evaluation Result</DialogTitle>
                            {evaluationResult ? (
                              <div className="text-sm bg-gray-100 p-4 rounded border border-gray-200 overflow-x-auto space-y-2">
                                <p><strong>Black-Scholes Price:</strong> {evaluationResult["Black-Scholes Price"].toFixed(2)}</p>
                                <p><strong>Premium Paid:</strong> {evaluationResult["Premium Paid"]}</p>
                                <p><strong>Breakeven Price:</strong> {evaluationResult["Breakeven Price"]}</p>
                                <p><strong>Intrinsic Value:</strong> {evaluationResult["Intrinsic Value"]}</p>
                                <p><strong>Time Value:</strong> {evaluationResult["Time Value"]}</p>
                                <p><strong>Is Favorable:</strong> {evaluationResult["Is Favorable"] ? "Yes" : "No"}</p>
                                <div>
                                  <strong>Greeks:</strong>
                                  <ul className="list-disc ml-5">
                                    <li><strong>Delta:</strong> {evaluationResult.Greeks.Delta.toFixed(4)}</li>
                                    <li><strong>Gamma:</strong> {evaluationResult.Greeks.Gamma.toFixed(4)}</li>
                                    <li><strong>Theta:</strong> {evaluationResult.Greeks.Theta.toFixed(2)}</li>
                                    <li><strong>Vega:</strong> {evaluationResult.Greeks.Vega.toFixed(4)}</li>
                                    <li><strong>Rho:</strong> {evaluationResult.Greeks.Rho.toFixed(4)}</li>
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-600">No evaluation result yet.</p>
                            )}
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Puts Section */}
              <h3 className="text-md font-medium text-gray-700 mt-4">Put Options</h3>
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 text-left">Contract Symbol</th>
                    <th className="border border-gray-200 p-2 text-right">Strike</th>
                    <th className="border border-gray-200 p-2 text-right">Last Price</th>
                    <th className="border border-gray-200 p-2 text-right">Bid</th>
                    <th className="border border-gray-200 p-2 text-right">Ask</th>
                    <th className="border border-gray-200 p-2 text-right">Volume</th>
                    <th className="border border-gray-200 p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {option.puts?.map((put, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2">{put.contractSymbol}</td>
                      <td className="border border-gray-200 p-2 text-right">{put.strike}</td>
                      <td className="border border-gray-200 p-2 text-right">{put.lastPrice}</td>
                      <td className="border border-gray-200 p-2 text-right">{put.bid}</td>
                      <td className="border border-gray-200 p-2 text-right">{put.ask}</td>
                      <td className="border border-gray-200 p-2 text-right">{put.volume}</td>
                      <td className="border border-gray-200 p-2 text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => handleEvaluate('put', { ...put, expiration_date: option.expiration_date })}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Evaluate
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <DialogTitle className="text-lg font-bold mb-4 text-gray-800">Evaluation Result</DialogTitle>
                            {evaluationResult ? (
                              <div className="text-sm bg-gray-100 p-4 rounded border border-gray-200 overflow-x-auto space-y-2">
                                <p><strong>Black-Scholes Price:</strong> {evaluationResult["Black-Scholes Price"].toFixed(2)}</p>
                                <p><strong>Premium Paid:</strong> {evaluationResult["Premium Paid"]}</p>
                                <p><strong>Breakeven Price:</strong> {evaluationResult["Breakeven Price"]}</p>
                                <p><strong>Intrinsic Value:</strong> {evaluationResult["Intrinsic Value"]}</p>
                                <p><strong>Time Value:</strong> {evaluationResult["Time Value"]}</p>
                                <p><strong>Is Favorable:</strong> {evaluationResult["Is Favorable"] ? "Yes" : "No"}</p>
                                <div>
                                  <strong>Greeks:</strong>
                                  <ul className="list-disc ml-5">
                                    <li><strong>Delta:</strong> {evaluationResult.Greeks.Delta.toFixed(4)}</li>
                                    <li><strong>Gamma:</strong> {evaluationResult.Greeks.Gamma.toFixed(4)}</li>
                                    <li><strong>Theta:</strong> {evaluationResult.Greeks.Theta.toFixed(2)}</li>
                                    <li><strong>Vega:</strong> {evaluationResult.Greeks.Vega.toFixed(4)}</li>
                                    <li><strong>Rho:</strong> {evaluationResult.Greeks.Rho.toFixed(4)}</li>
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-600">No evaluation result yet.</p>
                            )}
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TickerPage;

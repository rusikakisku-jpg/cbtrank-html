export async function onRequest(context) {
  const { request } = context;
  const urlParams = new URL(request.url).searchParams;
  let targetUrl = urlParams.get('url') ? urlParams.get('url').trim() : '';

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      if (body && body.url) targetUrl = body.url.trim();
    } catch (e) {}
  }

  if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
    return new Response(JSON.stringify({
      success: false,
      error: "No data found or Invalid/Expired Answer Key URL."
    }, null, 2), { headers: corsHeaders, status: 200 });
  }

  const isDigialmPattern = (
    targetUrl.includes('digialm.com') ||
    targetUrl.includes('tcsion.com') ||
    targetUrl.includes('AssessmentQP') ||
    targetUrl.includes('touchstone') ||
    targetUrl.includes('per/g')
  );

  if (!isDigialmPattern) {
    return new Response(JSON.stringify({
      success: false,
      error: "No data found or Invalid/Expired Answer Key URL."
    }, null, 2), { headers: corsHeaders, status: 200 });
  }

  // 1. Try VPS 1 (Bright Data Indian ISP Proxy API)
  try {
    const res1 = await fetch(`http://147.93.154.159/digialm.php?url=${encodeURIComponent(targetUrl)}`);
    if (res1.ok) {
      const rawText = await res1.text();
      try {
        const json = JSON.parse(rawText);
        if (json && json.success) {
          return new Response(rawText, { headers: corsHeaders, status: 200 });
        }
      } catch (e) {}
    }
  } catch (e) {}

  // 2. Try VPS 2 (Secondary Direct Fast API)
  try {
    const res2 = await fetch(`http://200.97.175.162:8585/api.php?url=${encodeURIComponent(targetUrl)}`);
    if (res2.ok) {
      const rawText2 = await res2.text();
      try {
        const json2 = JSON.parse(rawText2);
        if (json2 && json2.success) {
          return new Response(rawText2, { headers: corsHeaders, status: 200 });
        }
      } catch (e) {}
    }
  } catch (e) {}

  // 3. Return Error if both fail
  return new Response(JSON.stringify({
    success: false,
    error: "No data found or Invalid/Expired Answer Key URL."
  }, null, 2), { headers: corsHeaders, status: 200 });
}

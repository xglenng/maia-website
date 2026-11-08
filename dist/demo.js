(() => {
  const interactive = document.getElementById('sample-interactive');
  if (!interactive) return;

  const messages = document.getElementById('sample-messages');
  const form = document.getElementById('sample-form');
  const input = document.getElementById('sample-input');
  const reset = document.getElementById('sample-reset');
  const service = document.getElementById('sample-service');
  const confirmation = document.getElementById('sample-confirmation');
  const conversationTab = document.getElementById('sample-conversation-tab');
  const bookingTab = document.getElementById('sample-booking-tab');
  const conversation = document.getElementById('sample-conversation');
  const booking = document.getElementById('sample-booking');
  const prompts = [...interactive.querySelectorAll('[data-prompt]')];
  const slots = [...interactive.querySelectorAll('[data-slot]')];
  let replyTimer;

  function setTab(selected, focus = false) {
    const showConversation = selected === conversationTab;
    for (const tab of [conversationTab, bookingTab]) {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    }
    conversation.hidden = !showConversation;
    booking.hidden = showConversation;
    if (focus) selected.focus();
  }

  function addMessage(sender, text) {
    const message = document.createElement('div');
    message.className = `sample-message ${sender === 'You' ? 'sample-message-client' : 'sample-message-maia'}`;
    const label = document.createElement('strong');
    label.textContent = sender;
    const body = document.createElement('p');
    body.textContent = text;
    message.append(label, body);
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  function replyFor(question) {
    const text = question.toLowerCase();
    if (/\b(piercing|piercings|cover[\s-]?up|removal|aftercare|refund|cancel|reschedul|walk[\s-]?in)\b/.test(text)) {
      return "This sample only has details for fine-line tattoos and consultations. In a real conversation, the artist can step in to help with other questions.";
    }
    if (/\b(consult|consultation)\b/.test(text)) {
      service.value = 'consultation';
      return "A consultation at Juniper Ink is complimentary. We can talk through your idea before the artist confirms the design and price. Try “Book a time” to choose a sample slot.";
    }
    if (/\b(price|prices|pricing|cost|costs|much|charge|charges|deposit)\b/.test(text)) {
      service.value = 'tattoo';
      return "Our sample fine-line tattoo session is $250 for two hours, with a $50 deposit. The artist confirms the final estimate for your design. You can choose a sample time in “Book a time.”";
    }
    if (/\b(book|booking|appointment|schedule|availability|available|time|times)\b/.test(text)) {
      if (/\b(tattoo|fine[\s-]?line)\b/.test(text)) service.value = 'tattoo';
      return "We can start with a complimentary consultation or a sample fine-line tattoo session. Open “Book a time” to choose a fictional service and time.";
    }
    if (/\b(service|services|tattoo|tattoos|fine[\s-]?line)\b/.test(text)) {
      return "Juniper Ink’s sample services include fine-line tattoos and complimentary consultations. A two-hour fine-line session is shown at $250, with a $50 deposit; the artist confirms the final estimate.";
    }
    return "I can help with this sample studio’s fine-line tattoo price, consultations, and example booking times. Try asking about one of those, or imagine the artist stepping in for anything else.";
  }

  function send(text) {
    const question = text.trim();
    if (!question || replyTimer) return;
    addMessage('You', question);
    const reply = replyFor(question);
    confirmation.hidden = true;
    confirmation.textContent = '';
    input.value = '';
    input.disabled = true;
    form.querySelector('button').disabled = true;
    prompts.forEach(button => { button.disabled = true; });
    const typing = addMessage('Maia', 'Typing…');
    replyTimer = window.setTimeout(() => {
      typing.remove();
      addMessage('Maia', reply);
      input.disabled = false;
      form.querySelector('button').disabled = false;
      prompts.forEach(button => { button.disabled = false; });
      replyTimer = undefined;
    }, 700);
  }

  function resetDemo() {
    window.clearTimeout(replyTimer);
    replyTimer = undefined;
    messages.replaceChildren();
    input.value = '';
    input.disabled = false;
    form.querySelector('button').disabled = false;
    prompts.forEach(button => { button.disabled = false; });
    service.value = 'consultation';
    confirmation.hidden = true;
    confirmation.textContent = '';
    setTab(conversationTab);
    addMessage('Maia', 'Hi! Welcome to Juniper Ink. What are you thinking about for your next tattoo?');
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    send(input.value);
  });
  prompts.forEach(button => button.addEventListener('click', () => send(button.dataset.prompt)));
  reset.addEventListener('click', resetDemo);
  conversationTab.addEventListener('click', () => setTab(conversationTab));
  bookingTab.addEventListener('click', () => setTab(bookingTab));
  document.getElementById('sample-open-booking').addEventListener('click', () => setTab(bookingTab, true));
  [conversationTab, bookingTab].forEach(tab => tab.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      setTab(tab === conversationTab ? bookingTab : conversationTab, true);
    }
  }));
  service.addEventListener('change', () => {
    confirmation.hidden = true;
    confirmation.textContent = '';
  });
  slots.forEach(button => button.addEventListener('click', () => {
    const selectedService = service.value === 'tattoo' ? 'Fine-line tattoo' : 'Tattoo consultation';
    confirmation.textContent = `Demo confirmation: ${selectedService}, ${button.dataset.slot}. This is only an example; no appointment has been booked.`;
    confirmation.hidden = false;
  }));

  resetDemo();
  interactive.hidden = false;
  reset.hidden = false;
})();

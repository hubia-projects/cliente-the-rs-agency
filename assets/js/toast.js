// Toast notification for error messages
function showErrorToast(message) {
  // Remove any existing toast
  const oldToast = document.getElementById('custom-toast-error');
  if (oldToast) oldToast.remove();

  // Create toast container
  const toast = document.createElement('div');
  toast.id = 'custom-toast-error';
  toast.innerHTML = `<span>${message}</span>`;
  toast.style.position = 'fixed';
  toast.style.top = '32px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(220, 53, 69, 0.97)';
  toast.style.color = '#fff';
  toast.style.padding = '18px 32px';
  toast.style.borderRadius = '16px';
  toast.style.boxShadow = '0 6px 32px rgba(0,0,0,0.18)';
  toast.style.fontSize = '1.1rem';
  toast.style.fontWeight = '600';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s';

  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}
// Toast notification for success messages
function showSuccessToast(message) {
  // Remove any existing toast
  const oldToast = document.getElementById('custom-toast-success');
  if (oldToast) oldToast.remove();

  // Create toast container
  const toast = document.createElement('div');
  toast.id = 'custom-toast-success';
  toast.innerHTML = `<span>${message}</span>`;
  toast.style.position = 'fixed';
  toast.style.top = '32px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(40, 167, 69, 0.97)';
  toast.style.color = '#fff';
  toast.style.padding = '18px 32px';
  toast.style.borderRadius = '16px';
  toast.style.boxShadow = '0 6px 32px rgba(0,0,0,0.18)';
  toast.style.fontSize = '1.1rem';
  toast.style.fontWeight = '600';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s';

  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

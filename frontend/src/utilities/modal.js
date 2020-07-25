import { Modal } from "antd";

export function successModal() {
  Modal.success({
    title: 'Success',
    content: 'The data have been submitted successfully',
  });
}

export function errorModal() {
  Modal.error({
    title: 'Failed',
    content: 'Failed to submit the data',
  });
}
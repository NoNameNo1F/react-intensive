import { useState } from "react";
import { Pagination } from "../../../components/pagination";
import Badge from "../../../features/submission/components/badge";
import Modal from "../../../features/submission/components/modal";
import {
  useApproveSubmissionMutation,
  useGetSubmissions,
  useRejectSubmissionMutation,
} from "../../../hooks/use-submission";
import type { Submission } from "../../../types/submission";

const ReviewSubmissionsPage = () => {
  const { data: submissions } = useGetSubmissions();
  const { mutateAsync: approveSubmission } = useApproveSubmissionMutation();
  const { mutateAsync: rejectSubmission } = useRejectSubmissionMutation();

  // Modal & confirmation state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "approve" | "reject" | null
  >(null);
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(
    null
  );

  const openConfirm = (
    submission: Submission,
    action: "approve" | "reject"
  ) => {
    setActiveSubmission(submission);
    setConfirmAction(action);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setConfirmOpen(false);
    if (!confirmAction) return;

    try {
      if (confirmAction === "approve") {
        await approveSubmission();
      } else {
        await rejectSubmission();
      }
    } catch (err) {
      console.error(`${confirmAction} submission failed: `, err);
    } finally {
      setConfirmAction(null);
      setActiveSubmission(null);
    }
  };

  return (
    <div
      className="
        flex flex-col justify-start gap-2
        border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
      mr-4 p-4"
    >
      <h1 className="w-full m-2 font-bold text-2xl">KYC Submission</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-900 border-none rounded-lg">
            <tr>
              <th className="px-5 py-3 sm:px-6">
                <div className="flex items-center">
                  <p className="font-bold text-gray-800 text-theme-xs dark:text-gray-400">
                    NAME
                  </p>
                </div>
              </th>
              <th className="px-5 py-3 sm:px-6">
                <div className="flex items-center">
                  <p className="font-bold text-gray-800 text-theme-xs dark:text-gray-400">
                    STATUS
                  </p>
                </div>
              </th>
              <th className="px-5 py-3 sm:px-6">
                <div className="flex items-center">
                  <p className="font-bold text-gray-800 text-theme-xs dark:text-gray-400">
                    DATE
                  </p>
                </div>
              </th>
              <th className="px-5 py-3 sm:px-6">
                <div className="flex items-center">
                  <p className="font-bold text-gray-800 text-theme-xs dark:text-gray-400">
                    ACTION
                  </p>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {submissions?.result.map((submission: Submission) => {
              return (
                <tr className="px-5 py-4 sm:px-6" key={submission.submissionId}>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center">
                      <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        {submission.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <Badge status={submission.status} />
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center">
                      <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        {new Date(
                          submission.submissionDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center">
                      <button
                        className="border rounded-lg border-green-300 dark:border-green-700 text-green-900 dark:text-green-100 hover: border-green-800 hover:dark:border-green-300 mx-4 p-2"
                        onClick={() => openConfirm(submission, "approve")}
                        type="button"
                      >
                        Approve
                      </button>
                      <button
                        className="border rounded-lg border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 hover: border-red-800 hover:dark:border-red-300 p-2"
                        onClick={() => openConfirm(submission, "reject")}
                        type="button"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination />
      {/* Confirmation Dialog (reusable component) */}
      <Modal
        isOpen={confirmOpen}
        title={
          confirmAction === "approve"
            ? "Approve submission"
            : "Reject submission"
        }
        message={`Are you sure you want to ${confirmAction} "${
          activeSubmission?.name ?? "this submission"
        }"? This action cannot be undone.`}
        onConfirm={handleConfirm}
        onClose={() => setConfirmOpen(false)}
        confirmLabel={
          confirmAction === "approve" ? "Yes, approve" : "Yes, reject"
        }
        cancelLabel="Cancel"
        danger={confirmAction === "reject"}
      />
    </div>
  );
};

export default ReviewSubmissionsPage;

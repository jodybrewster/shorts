"use client";

import { useEffect, useState, useContext } from "react";

import DeleteIcon from "@/components/icons/DeleteIcon";
import ClipboardIcon from "@/components/icons/ClipboardIcon";
import EditIcon from "@/components/icons/EditIcon";
import EditForm from "@/components/modules/EditForm";
import { AppContext, Short } from "@/services/AppContext";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { settings } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { SkeletonRow } from "@/components/modules/SkeletonRow";

export default function ShortList({ newShort }: { newShort: string | null }) {
  const [editedShort, setEditedShort] = useState<Short | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { shorts, deleteShort } = useContext(AppContext);
  const { toast } = useToast();

  const copyTextToClipboard = (text: string): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Url copied to clipboard successfully!",
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Failed to copy text",
        });
      });
  };

  const list =
    shorts && shorts.length <= 0 ? (
      <div className="flex flex-col gap-1">
        <SkeletonRow />
      </div>
    ) : (
      <Table className="min-h-full overflow-auto">
        <TableBody>
          {shorts.map((short: any) => (
            <TableRow key={short.shortcode}>
              <TableCell className="font-medium w-2/4">
                <a
                  href={`http://localhost:3000/a/${short.shortcode}`}
                  className="underline"
                >
                  {short.shortcode}
                </a>
              </TableCell>
              <TableCell className="w-3/4">{short.url}</TableCell>
              <TableCell className="w-4/4">
                <div className="whitespace-nowrap">
                  {short.amountVisited} visits
                </div>
              </TableCell>
              <TableCell className="font-medium flex">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    copyTextToClipboard(
                      `${settings.HOST_URL}/a/${short.shortcode}`
                    );
                  }}
                >
                  <ClipboardIcon />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditedShort(short);
                    setIsDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const shortCode = short.shortcode;

                    deleteShort(shortCode)
                      .then((ok) => {
                        if (ok) {
                          toast({
                            title: `Short deleted`,
                          });
                        } else {
                          toast({
                            title: `Short could not be found`,
                          });
                        }
                      })
                      .catch((err) => {
                        toast({
                          title: `There was an error deleting your short`,
                        });
                      });
                  }}
                >
                  {" "}
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="border rounded-md border-gray-300" style={{ overflow: "visible", width: "100%" }}>{list}</div>

        <EditForm short={editedShort} setIsDialogOpen={setIsDialogOpen} />
      </Dialog>
    </>
  );
}

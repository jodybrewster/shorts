import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { settings } from "@/constants";
import { AppContext } from '@/services/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Short } from '@/services/AppContext';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface EditFormProps {
  short: Short | null;
  setIsDialogOpen: (arg0: boolean) => void;
}

interface EditFormValues {
  shortcode: string 
  url: string
  
}

const EditForm: React.FC<EditFormProps> = ({ short, setIsDialogOpen }) => {
  const {saveShort} = useContext(AppContext);
  const form = useForm<EditFormValues>();
  const {toast} = useToast();
  
  const [editedShort, setEditedShort] = useState(short);

  useEffect(() => {
    setEditedShort(short);
  }, [short])

  
  const onSubmit: SubmitHandler<EditFormValues> = (data, event) => {
    if (short && editedShort) {
      saveShort(short, editedShort)
      .then((data) => {
        setIsDialogOpen(false);
        toast({
          title: "Changes saved"
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to save the short"
        });
      });
    }
    
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedShort((prevShort: any) => ({
      ...prevShort,
      [name]: value,
    }));

  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Edit short</DialogTitle>
            <DialogDescription>
              Make changes to your short here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="shortcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shortcode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shortcode"
                      {...form.register('shortcode', { required: true })}
                      onChange={handleChange}
                      value={editedShort ? editedShort.shortcode : ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your slug or shortcode.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="url"
                      {...form.register('url', { required: true })}
                      onChange={handleChange}
                      value={editedShort ? editedShort.url : ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the url you want to redirect to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
export default EditForm;

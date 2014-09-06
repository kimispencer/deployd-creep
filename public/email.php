<?php
	$postdata = file_get_contents("php://input");
	$data = json_decode($postdata, true);

	$creep = "kimispencer@gmail.com";
	$email = $data['email'];

	$subject_subscribe = "Subscribe";
	$subject_confirmation = "Thanks for signing up!";

	$body_confirmation = "We'll keep you up to as we launch our latest products.";
	// $message = '<html><body>';
	// $message .= '<h1>Hello, World!</h1>';
	// $message .= '</body></html>';


	// send subscribe email to creep
	mail( $creep, $subject_subscribe, $email, "From: $email" ) or die ("Mail could not be sent.");
	// send confirmation email to user
	mail( $email, $subject_confirmation, $body_confirmation, "From: $creep" );
?>
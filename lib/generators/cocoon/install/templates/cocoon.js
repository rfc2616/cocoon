$(document).ready(function() {

  $('.add_fields').live('click', function() {
    var assoc   = $(this).attr('data-association');
    var content = $(this).attr('data-template');
    var insertionPosition = $(this).attr('data-association-insertion-position');
    var insertionNode = $(this).attr('data-association-insertion-node');
    var regexp_braced = new RegExp('\\[new_' + assoc + '\\]', 'g');
    var new_id  = new Date().getTime();
    var new_content = content.replace(regexp_braced, '[' + new_id + ']');
    if (new_content == content) {
        regexp_braced = new RegExp('\\[new_' + assoc + 's\\]', 'g');
        new_content = content.replace(regexp_braced, '[' + new_id + ']');
    }

    // this block attempts to eliminate HTML id collisions. the approach
    // is coarse; it could be done better by actually finding the ids and
    // making the replacements exactly where needed.
    var regexp_id = new RegExp('_new_' + assoc + '_', 'g');
    var newer_content = new_content.replace(regexp_id, '_' + new_id + '_');
    if (newer_content == new_content) {
        regexp_id = new RegExp('_new_' + assoc + 's_', 'g');
        newer_content = new_content.replace(regexp_id, '_' + new_id + '_');
    }

    if (insertionNode) {
      insertionNode = $(insertionNode);
    }
    else {
      insertionNode = $(this).parent();
    }

    if (insertionPosition == 'after'){
      insertionNode.after(newer_content);
    } else {
      insertionNode.before(newer_content);
    }

    return false;
  });

  $('.remove_fields.dynamic').live('click', function() {
    $(this).closest(".nested-fields").remove();
    return false;
  });

  $('.remove_fields.existing').live('click', function() {
    $(this).prev("input[type=hidden]").val("1");
    $(this).closest(".nested-fields").hide();
    return false;
  });

});

